import { BoardGameModel } from "../db/schemas/boardgame";
import fs from "fs";

class boardGameService {
    // insert 후 테스트용 함수
    static async insert() {
        fs.readFile(
            "/Users/nowgnas/projects/board-game-recommendation-project/back/src/controllers/finalDataset.json",
            (err, json) => {
                const jsonData = JSON.parse(json);
                jsonData.data.forEach(async (element) => {
                    const item = {
                        //
                        index: element.index,
                        un_named: element.un_named,
                        game_id: element.game_id,
                        game_name: element.game_name,
                        year: element.year,
                        rank: element.rank,
                        average_rating: element.average_rating,
                        bayes_average: element.bayes_average,
                        user_rated: element.user_rated,
                        url: element.url,
                        thumbnail: element.thumbnail,
                        wordcloud: element.wordcloud,
                        min_player: element.min_player,
                        max_player: element.max_player,
                        min_age: element.min_age,
                        playing_time: element.playing_time,
                        min_playing_time: element.min_playing_time,
                        max_playing_time: element.max_playing_time,
                        complexity_average: element.complexity_average,
                        theme: element.theme,
                        image: element.image,
                        description: element.description,
                        recommend_id: element.recommend_id,
                    };
                    await BoardGameModel.create(item);
                });
            }
        );

        const games = await BoardGameModel.create();
        return games;
    }

    // 정렬 type 설정
    static sortType({ sortField }) {
        switch (sortField) {
            case "rank":
                return { rank: 1 };
            case "rating":
                return { bayes_average: -1 };
            case "userRated":
                return { user_rated: -1 };
            default:
                return null;
        }
    }

    // pagination을 위한 함수
    static async offsetPatinate(findFunc, aggregator, args) {
        const { size, currentPage } = args;
        const games = await findFunc();
        const total = await aggregator();

        let totalPage = Math.ceil(total / size);
        return {
            games,
            totalPage,
        };
    }

    static async findGames({ query, sortType, page, perPage }) {
        // total page 계산
        const aggregator = async () =>
            await BoardGameModel.countDocuments(query);

        // 조건에 따른 보드게임 조회, pagination
        const findFunc = async () =>
            await BoardGameModel.find(query)
                .sort(this.sortType({ sortField: sortType }))
                .skip(perPage * (page - 1))
                .limit(perPage);

        const errorMessage =
            findFunc.length === 0 ? "조건에 맞는 보드게임이 없습니다." : null;

        const { games, totalPage } = await this.offsetPatinate(
            findFunc,
            aggregator,
            { size: perPage, currentPage: page }
        );
        return { totalPage, games, errorMessage };
    }

    // 최신 게임 전체 조회(보드게임 메인 페이지 default 조회)
    static async findByRecentlyGames({ page, perPage }) {
        const query = {
            year: { $eq: 2020 },
        };

        const { totalPage, games, errorMessage } = await this.findGames({
            query,
            page,
            perPage,
        });

        if (errorMessage) return { errorMessage };

        return { totalPage, games };
    }

    // game_id로 조회
    static async findByGameId({ gameId }) {
        const games = await BoardGameModel.findOne({ game_id: gameId });

        if (!games) return { errorMessage: "game id가 존재하지 않습니다." };

        return games;
    }

    // player 기준 범위 안 보드게임 조회
    static async findByPlayer({ playerCount, sortType, page, perPage }) {
        // 인원 수 조회 option
        const query = {
            $nor: [
                { min_player: { $gt: playerCount } },
                { max_player: { $lt: playerCount } },
            ],
        };

        const { totalPage, games, errorMessage } = await this.findGames({
            query,
            sortType,
            page,
            perPage,
        });

        if (errorMessage) return { errorMessage };

        return { totalPage, games };
    }

    // 연령별 기준 보드게임 조회
    static async findByAge({ age, sortType, page, perPage }) {
        const query = {
            min_age: { $lte: age },
        };

        const { totalPage, games, errorMessage } = await this.findGames({
            query,
            sortType,
            page,
            perPage,
        });

        if (errorMessage) return { errorMessage };

        return { totalPage, games };
    }

    // theme 기준 정렬
    static async findByTheme({ theme, sortType, page, perPage }) {
        const query = {
            theme: { $in: [theme] },
        };
        const { totalPage, games, errorMessage } = await this.findGames({
            query,
            sortType,
            page,
            perPage,
        });

        if (errorMessage) return errorMessage;

        return { totalPage, games };
    }

    // 시간 기준 정렬
    static async findByTime({ time, sortType, page, perPage }) {
        const query = {
            $nor: [
                { min_playing_time: { $gt: time } },
                { max_playing_time: { $lt: time } },
            ],
        };

        const { totalPage, games, errorMessage } = await this.findGames({
            query,
            sortType,
            page,
            perPage,
        });

        if (errorMessage) return { errorMessage };

        return { totalPage, games };
    }

    static async findByComplexity({ complexity, sortType, page, perPage }) {
        const query = {
            complexity_average: {
                $gte: Math.floor(complexity),
                $lte: Math.floor(complexity) + 1,
            },
        };
        const { totalPage, games, errorMessage } = await this.findGames({
            query,
            sortType,
            page,
            perPage,
        });

        if (errorMessage) return { errorMessage };

        return { totalPage, games };
    }

    // keyword 기준 보드게임 조회
    static async search({ keyword, page, perPage }) {
        const query = {
            $or: [
                // 문자열 포함 조회
                { domains: { $regex: keyword, $options: "i" } },
                { game_name: { $regex: keyword, $options: "i" } },
            ],
        };
        const { totalPage, games, errorMessage } = await this.findGames({
            query,
            page,
            perPage,
        });

        if (errorMessage) return { errorMessage };

        return { totalPage, games };
    }
}

export { boardGameService };
