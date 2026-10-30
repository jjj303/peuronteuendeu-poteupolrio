# 이지호 포트폴리오

HTML5, CSS3, 순수 Vanilla JavaScript로 만든 정적 한국어 포트폴리오입니다. 페이지 실행에는 프레임워크, 백엔드, 데이터베이스, 외부 API가 필요하지 않습니다. 사이트에는 제공된 실제 정보만 담았고, 프로젝트 목록은 비어 있는 상태입니다.

## 파일 구조

```text
artifacts/jiho-portfolio/
├── index.html       # 페이지 콘텐츠와 접근성 구조
├── assets/favicon.svg # 탭 아이콘
├── css/styles.css   # 색상, 타이포그래피, 반응형 레이아웃과 모션
├── js/main.js       # 메뉴, 섹션 탐색, 프로젝트 목록과 상세 보기
├── vite.config.ts   # Replit 미리보기 및 선택적 정적 빌드 설정
└── README.md
```

이미지를 사용하지 않아 이미지 폴더는 없습니다. 모든 CSS와 JavaScript 경로는 `./` 상대 경로라 GitHub Pages 저장소 하위 경로에서도 로드됩니다.

## 수정할 정보

- 이름, 희망 직무, 소개, 개발에 관심을 갖게 된 계기, 활동: `index.html`
- 기술과 도구 표시: `index.html`
- 이메일과 GitHub 주소: `index.html`
- 프로젝트 목록과 상세 정보: `js/main.js`의 `projectData`
- 색상, 글꼴, 간격, 반응형 규칙: `css/styles.css`의 `:root`와 미디어 쿼리

입력되지 않은 강점, 수상, 자격증, 프로젝트, 활용 기술, 성과는 추가하지 않았습니다. 내용은 확인된 실제 경험으로만 바꿔 주세요.

## 실제 프로젝트 추가

실제로 만든 프로젝트만 `js/main.js`의 `projectData` 배열에 추가하면 카드가 나타납니다. 카드의 **자세히 보기** 버튼은 상세 모달을 열며, 비어 있는 선택 항목은 표시되지 않습니다.

```js
const projectData = [
  {
    title: '실제 프로젝트 이름',
    category: '개인 프로젝트',
    description: '프로젝트를 한 문장으로 소개합니다.',
    purpose: '실제 제작 목적',
    role: '직접 맡은 역할',
    technologies: ['실제로 사용한 기술'],
    features: ['실제로 구현한 기능'],
    problemSolution: '직접 해결한 문제와 과정',
    outcome: '확인된 결과',
    learned: '직접 배운 점',
    url: 'https://github.com/사용자명/저장소',
  },
];
```

실제 정보가 없는 항목은 지우거나 비워 두세요. 프로젝트가 아직 없다면 현재처럼 배열을 비워 둡니다.

## GitHub Pages 배포

사이트 파일은 `artifacts/jiho-portfolio/`에 있습니다. 별도 저장소라면 이 폴더 안의 파일을 저장소 루트로 복사하고, GitHub 저장소의 **Settings → Pages**에서 브랜치의 루트 폴더를 게시 대상으로 선택할 수 있습니다.

이 모노레포를 그대로 사용하는 경우 GitHub Actions가 해당 폴더를 정적 산출물로 올리도록 설정합니다. 아래 예시는 프레임워크 빌드 없이 `index.html`, CSS, JavaScript를 바로 게시합니다.

```yaml
name: Deploy portfolio to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: artifacts/jiho-portfolio
      - id: deployment
        uses: actions/deploy-pages@v4
```

워크플로 파일을 `.github/workflows/` 아래에 저장한 뒤 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다. 별도 저장소로 복사한 경우 업로드 경로를 `.`으로 바꾸면 됩니다.

## 로컬 미리보기

Replit 프로젝트 루트에서 아래 명령으로 미리보기와 선택적 정적 빌드를 실행할 수 있습니다.

```bash
pnpm --filter @workspace/jiho-portfolio run dev
BASE_PATH=./ pnpm --filter @workspace/jiho-portfolio run build
```

빌드 결과는 `artifacts/jiho-portfolio/dist/public/`에 생성됩니다. GitHub Pages에서는 위 워크플로처럼 소스 폴더를 직접 게시해도 됩니다.
