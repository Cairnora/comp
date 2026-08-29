# AKORA Company Website

아코라 유한회사의 정적 회사 홈페이지, 공고 게시판, 제품별 공개 정책 문서입니다.

## 구성

- `index.html`: 회사 소개 1페이지
- `notices/index.html`: 공고 목록
- `notices/<게시일>-<slug>/index.html`: 공고 원문
- `products/<product-slug>/`: 제품별 한국어·영어 개인정보처리방침, 이용약관, 고객지원과 오픈소스 고지
- `scripts/prepare-site.mjs`: 공개 준비가 끝난 제품 정책만 포함하는 Pages 빌드
- `styles.css`: 공통 스타일
- `site.js`: 한국어/영어 전환

## 제품 정책 추가

제품 정책은 제품 저장소의 엄격 검증을 통과한 빌드만 받습니다. 제품 디렉터리에
`publish-manifest.json`이 없거나 HTML에 초안 값이 남아 있으면 Pages 빌드가 해당 제품을
게시하지 않거나 실패합니다.

무한공전은 `/Users/ahn/Workspace/html5-game`에서 다음 명령으로 내보냅니다.

```bash
npm run export:legal:company
```

공개 기본 주소는 `https://akoracorp.com/products/endless-orbit/`이며, 한국어 문서는 `/ko/`, 영어 문서는 `/en/` 아래에 있습니다.

## 공고 추가

1. 기존 공고 상세 폴더를 복사해 새 게시일과 제목으로 수정합니다.
2. `notices/index.html`의 공고 목록 맨 위에 새 공고를 추가합니다.
3. `index.html`의 최근 공고 영역도 같은 내용으로 갱신합니다.
4. 게시 전 제목, 게시일, 본문, 첨부 파일, 링크를 확인합니다.

법정 공고는 한국어 원문을 기준으로 보관합니다.
