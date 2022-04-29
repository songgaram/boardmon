# (보드게임 추천 서비스)

- 보드게임 추천 서비스

## 프로젝트 구성 안내

## 1. 프로젝트 소개

**어떠한 데이터셋와 도구 및 기술을 사용했는지에 대한 설명과 엔드유저에게 보이는 웹서비스에 대한 소개**

- 사용하려는 데이터(제안된 데이터 중 하나 또는 선택한 다른 데이터 세트)를 명시, 이에 대한 설명
- 웹서비스에 대한 자세한 개요

### 사용 데이터

### 기술 스택

- python
- jupyter
- colab
- javascript
- react
- mongoDB

### 사용한 라이브러리

- mui
- numpy
- pandas
- wordCloud

### 웹 서비스 개요

## 2. 프로젝트 목표

코로나19 확산으로 일상에 변했습니다. 밖에 나가지 못하고 집에서 대부분의 시간을 보내는 '집콕'이 장기화 되면서, 이제는 집에서 재미있게 시간을 보낼 수 있는 방법을 찾게 되었습니다. 주로 실내에서 즐길 수 있는 보드게임을 직접 사거나, 모마일 앱으로 플레이하는 경우가 늘어났는데, 우리는 그 중에서도 보드게임을 소개하는 서비스를 제공하고자 합니다.

하지만 보드게임을 선택함에 있어 적은 게임 정보와 다양한 보드게임 종류로 사용자가 선택하는데 어려움이 있습니다. 사용자에게 적합한 보드게임을 추천하고, 정보를 제공함에 따라 보드게임을 선택하는데 어려움을 줄이고자 하였습니다.
또한 보드게임 카페를 애용하는 사용자에게도 취향에 맞는 보드게임을 선택할 수 있도록 하여 맞춤형 보드게임을 추천하고자 합니다.

[중앙일보 기사: 집콕하는 나를 위한 선물... 보드게임 판매량 716% 급증했다](https://www.joongang.co.kr/article/23890658#home)

## 3. 프로젝트 기능 설명

[사이트이름]은 사람들과 함께 집에서 시간을 보낼 수 있는 하나의 방향성을 제시하여, 즐거움을 선사합니다. 보드게임에 대해 잘 모르는 입문자도 쉽게 접근할 수 있습니다. 또한 보드게임을 이미 많이 해보신 분들에게는 카테고리에 맞는 보드게임을 추천함으로써 다양한 보드게임을 접하게 해주며, 선택하는데 어려움을 줄여줍니다.

카테고리에 따른 추천시스템
친구들과 함께할 수 있는 보드게임을 추천해주는 시스템
카테고리 및 인원수를 체크한 뒤 그에 맞게 추천하는 보드게임 이름을 출력

데이터 분석
커멘트 많은 순, 랭킹 순, 평균 순, 평점 순 등 태그에 따른 정렬

프론트엔드에서 보여주기 (백엔드에서 데이터 전송)
워드 클라우드를 통해 결과를 출력

## 4. 프로젝트 구성도

- 와이어프레임/스토리보드 추가

## 5. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무               |
| ------ | ----------------------- |
| 김애림 | 프론트엔드 개발         |
| 노누리 | 백엔드 개발             |
| 송가람 | 프론트엔드 개발         |
| 안민영 | 프론트엔드 개발         |
| 소범기 | 백엔드 개발/데이터 분석 |
| 이상원 | 팀장/백엔드 개발        |

**멤버별 responsibility**

1. 팀장

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 프론트 디자인 수정

3.  백엔드 & 데이터 담당

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석/ 시각화 방식 수정


> 추천시스템 정리

- Collarborative Filtering
    - Item-based CF : 게임 사용자들의 매긴 게임 평점들과 유사한 패턴으로 평점이 부여된 보드게임을 추천하는 방식
    - 가정 : `이전 게임 사용자들이 미래에 동일한 보드게임 성향을 갖는다`
    - explicit data collection : 2000년도 부터 2019년 까지 보드게임 사용자들의 댓글을 통한 게임 평저믈 사용
    - 사용자들의 보드게임 평점을 Vector형식으로 나타내여 보드게임 들의 cosine similarity를 사용하여 비슷한 유형의 게임을 1~5위의 추천 게임 feature을 제공

- 문제점
    - cold star problem : 기존에 게임 사용자가 제공한 평점의 데이터 기반으로 추천하기 때문에, 새로운 보드게임에 대해서는 추천할 수 없는문제 발생 -> 보드게임 랭킹 500안에 있는 2020년 이후의 최신게임은 새로운 카테고리를 통해 정보를 제공하여 해결
    - 계산 효율 저하 -> 보드 게임 랭킹 500위 안에있는 게임만을 활용하여 계산량을 낮춤

- if 시간이 충분했다면...
    - 최근 추천시스템은 content-base filtering과 collaborative filtering을 합친 hybrid 시스템을 많이 사용한다. 또는 Machine Learning을 활용한 추천시스템을 제작할 수 있다. hybrid 시스템의 경우에는 추천시스템의 제작의 목적에 따라 다양한 ensemble방법들이 존재하고, 구체적인 방법론 보다는 직관에 의존한 방법론이 많았다. 저희팀은 content-base filtering과 collaborative filtering을 구현했지만 수치적으로 타당하게 근거를 줄 수 있는 collaborative filtering을 선택했다. 그리고 Machine Learning을 확실하게 적용하기 위해서는 data에 대한 domain지식이 충분해야한다. 그러나 kaggle data는 미국 사용자에 대한 정보로 model을 구성해야 하기 때문에 data를 한국사람의 data로 대표할 수 없고, 보드게임에 대한 구체적인 domain 지식이 부족했다. 따라서 정확한 모델을 만들 수 없고, 모델을 제작한다 하더라도 python을 js에서 동작하는 지식이 부족했다. 위의 두가지 문제를 해결한다면 한국인에 더 친화적인 model을 만들 수 있다 생각한다. 




## 6. 버전

- 1.0.0

## 7. FAQ

- 자주 받는 질문 정리
