import { useMemo, useRef, useState } from 'react'
import './App.css'

const ASSETS = {
  logo: 'http://localhost:3845/assets/169d886ca50f85b0c9cc1db9191d652cdcdb242b.svg',
  panel: 'http://localhost:3845/assets/7022154c7c5a73e6d8ee125bfc408e00035804bb.png',
  arrow: 'http://localhost:3845/assets/bf1ff3106d75e183423fe88c22218bd93f392205.svg',
  arrowRight: 'http://localhost:3845/assets/6973451d9b58121be8688cc972cfe9bffb9eaf95.svg',
  first: 'http://localhost:3845/assets/d60f8f2579fb009f90fd4c90719d546da14b00c3.svg',
  prev: 'http://localhost:3845/assets/7a23fbf1e5e1ce9d11446e613275859f1d789c4f.svg',
  next: 'http://localhost:3845/assets/3dc1e05bf9cc008d0652dd3d51484ab502196b18.svg',
  last: 'http://localhost:3845/assets/5dd024dd8fe410f2864c22acd5ab257f308f6b05.svg',
  info: 'http://localhost:3845/assets/18687cf15f0ba4a884f2137bde1a2c9f19f58ada.svg',
  navPrev: 'http://localhost:3845/assets/42ec325ef49d74229286be1c394de5624ccc1c93.svg',
  navNext: 'http://localhost:3845/assets/83af8f306064580a3922bca62ac57bf6b4c98583.svg',
}

const initialCards = [
  {
    id: 1,
    title: '[HD현대에너지] 모듈 640W',
    content: 'HD현대에너지 모듈 640W 제품 소개입니다.',
    thumbnail: ASSETS.panel,
  },
  {
    id: 2,
    title: '[HD현대에너지] 모듈 640W',
    content: 'HD현대에너지 모듈 640W 제품 소개입니다.',
    thumbnail: ASSETS.panel,
  },
  {
    id: 3,
    title: '[HD현대에너지] 모듈 640W',
    content: 'HD현대에너지 모듈 640W 제품 소개입니다.',
    thumbnail: ASSETS.panel,
  },
  {
    id: 4,
    title: '[HD현대에너지] 모듈 640W',
    content: 'HD현대에너지 모듈 640W 제품 소개입니다.',
    thumbnail: ASSETS.panel,
  },
  {
    id: 5,
    title: '[HD현대에너지] 모듈 640W',
    content: 'HD현대에너지 모듈 640W 제품 소개입니다.',
    thumbnail: ASSETS.panel,
  },
]

function SidebarSection({ title, open, children }) {
  return (
    <div className="sidebar-section">
      <button className="section-trigger" type="button">
        <span>{title}</span>
        <img alt="" className={open ? 'icon-chevron open' : 'icon-chevron'} src={ASSETS.arrow} />
      </button>
      {open ? <div className="section-content">{children}</div> : null}
    </div>
  )
}

function Card({ title, thumbnail, onClick }) {
  return (
    <button className="product-card product-card-button" onClick={onClick} type="button">
      <div className="thumb-wrap">
        <img alt="태양광 모듈" className="thumb" src={thumbnail} />
      </div>
      <p className="card-title">{title}</p>
    </button>
  )
}

function App() {
  const [view, setView] = useState('list')
  const [formMode, setFormMode] = useState('create')
  const [cards, setCards] = useState(initialCards)
  const [selectedId, setSelectedId] = useState(initialCards[0].id)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState('')
  const [thumbnailName, setThumbnailName] = useState('')
  const fileInputRef = useRef(null)

  const selectedIndex = useMemo(
    () => cards.findIndex((card) => card.id === selectedId),
    [cards, selectedId],
  )
  const selectedCard = selectedIndex >= 0 ? cards[selectedIndex] : null
  const prevCard = selectedIndex > 0 ? cards[selectedIndex - 1] : null
  const nextCard = selectedIndex >= 0 && selectedIndex < cards.length - 1 ? cards[selectedIndex + 1] : null

  const resetForm = () => {
    setTitle('')
    setContent('')
    setThumbnailDataUrl('')
    setThumbnailName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openCreateForm = () => {
    setFormMode('create')
    resetForm()
    setView('form')
  }

  const openEditForm = () => {
    if (!selectedCard) {
      return
    }

    setFormMode('edit')
    setTitle(selectedCard.title)
    setContent(selectedCard.content)
    setThumbnailDataUrl(selectedCard.thumbnail)
    setThumbnailName('')
    setView('form')
  }

  const closeForm = () => {
    resetForm()
    setView(formMode === 'edit' ? 'detail' : 'list')
  }

  const openDetail = (cardId) => {
    setSelectedId(cardId)
    setView('detail')
  }

  const openList = () => {
    setView('list')
  }

  const onPickThumbnail = () => {
    fileInputRef.current?.click()
  }

  const onThumbnailChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setThumbnailDataUrl(reader.result)
        setThumbnailName(file.name)
      }
    }
    reader.readAsDataURL(file)
  }

  const onRegister = () => {
    if (!title.trim() || !content.trim() || !thumbnailDataUrl) {
      alert('제목, 내용, 썸네일을 모두 입력해주세요.')
      return
    }

    if (formMode === 'edit') {
      setCards((prev) =>
        prev.map((card) =>
          card.id === selectedId
            ? {
                ...card,
                title: title.trim(),
                content: content.trim(),
                thumbnail: thumbnailDataUrl,
              }
            : card,
        ),
      )
      resetForm()
      setView('detail')
      return
    }

    const newCard = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      thumbnail: thumbnailDataUrl,
    }

    setCards((prev) => [newCard, ...prev])
    setSelectedId(newCard.id)
    resetForm()
    setView('list')
  }

  return (
    <div className="app-shell">
      <header className="top-header">
        <img alt="(유)다라건설" className="brand-logo" src={ASSETS.logo} />
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-inner">
            <SidebarSection open title="제품소개 작성">
              <button className="submenu-item active" type="button">모듈</button>
              <button className="submenu-item" type="button">인버터</button>
              <button className="submenu-item" type="button">알루미늄</button>
            </SidebarSection>
            <SidebarSection title="시공사례 작성" />
            <SidebarSection title="고객센터 작성" />
          </div>
        </aside>

        <main className="content">
          <div className="content-inner">
            <div className="crumb-row">
              <img alt="" className="crumb-icon" src={ASSETS.arrowRight} />
              <span className="crumb-text">제품소개 작성</span>
            </div>

            <div className="title-row">
              <h1 className="page-title">모듈</h1>

              {view === 'list' ? (
                <button className="register-btn" onClick={openCreateForm} type="button">등록</button>
              ) : null}

              {view === 'form' ? (
                <div className="form-actions">
                  <button className="cancel-btn" onClick={closeForm} type="button">취소</button>
                  <button className="register-btn" onClick={onRegister} type="button">
                    등록
                  </button>
                </div>
              ) : null}

              {view === 'detail' ? (
                <div className="form-actions">
                  <button className="cancel-btn" onClick={openList} type="button">목록</button>
                  <button className="register-btn" onClick={openEditForm} type="button">수정</button>
                </div>
              ) : null}
            </div>

            {view === 'list' ? (
              <>
                <div className="grid">
                  {cards.map((card) => (
                    <Card
                      key={card.id}
                      onClick={() => openDetail(card.id)}
                      thumbnail={card.thumbnail}
                      title={card.title}
                    />
                  ))}
                </div>

                <nav aria-label="Pagination" className="pagination">
                  <button className="page-btn icon" type="button"><img alt="처음" src={ASSETS.first} /></button>
                  <button className="page-btn icon" type="button"><img alt="이전" src={ASSETS.prev} /></button>
                  <button className="page-btn active" type="button">1</button>
                  <button className="page-btn" type="button">2</button>
                  <button className="page-btn" type="button">3</button>
                  <span className="ellipsis">...</span>
                  <button className="page-btn" type="button">10</button>
                  <button className="page-btn icon" type="button"><img alt="다음" src={ASSETS.next} /></button>
                  <button className="page-btn icon" type="button"><img alt="마지막" src={ASSETS.last} /></button>
                </nav>
              </>
            ) : null}

            {view === 'form' ? (
              <>
                <section className="form-panel">
                  <input
                    className="title-input"
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="제목을 입력해주세요."
                    value={title}
                  />

                  <textarea
                    className="content-input"
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="내용을 입력해주세요."
                    value={content}
                  />

                  <div className="thumb-section">
                    <div className="thumb-header-row">
                      <p className="thumb-label">썸네일</p>
                      <button className="attach-btn" onClick={onPickThumbnail} type="button">파일 첨부하기</button>
                      <input
                        accept="image/*"
                        className="hidden-file-input"
                        onChange={onThumbnailChange}
                        ref={fileInputRef}
                        type="file"
                      />
                    </div>
                    <div className="thumb-help-row">
                      <img alt="" src={ASSETS.info} />
                      <span>파일 1개까지 첨부 가능합니다.</span>
                    </div>
                    {thumbnailDataUrl ? (
                      <div className="thumb-preview-wrap">
                        <img alt={thumbnailName || '선택한 썸네일'} className="thumb-preview" src={thumbnailDataUrl} />
                        <span className="thumb-file-name">{thumbnailName || '첨부 이미지'}</span>
                      </div>
                    ) : null}
                  </div>
                </section>

                <section className="notice-box">
                  <p className="notice-title">작성 시 주의사항</p>
                  <ul>
                    <li>썸네일과 상품 이미지 별개로 업로드해주세요.</li>
                    <li>제목은 [브랜드명] 제품명 순으로 적어주시기 바랍니다.</li>
                  </ul>
                </section>
              </>
            ) : null}

            {view === 'detail' && selectedCard ? (
              <>
                <section className="detail-panel">
                  <div className="detail-body">
                    <div className="detail-title-line">
                      <h2>{selectedCard.title}</h2>
                    </div>

                    <div className="detail-main-image-wrap">
                      <img alt={selectedCard.title} className="detail-main-image" src={selectedCard.thumbnail} />
                    </div>
                  </div>
                </section>

                <section className="detail-nav">
                  <button
                    className="detail-nav-row"
                    disabled={!prevCard}
                    onClick={() => prevCard && openDetail(prevCard.id)}
                    type="button"
                  >
                    <span className="detail-nav-label">
                      <img alt="" src={ASSETS.navPrev} />
                      이전글
                    </span>
                    <span className="detail-nav-title">{prevCard ? prevCard.title : '제품이 없습니다.'}</span>
                  </button>

                  <button
                    className="detail-nav-row"
                    disabled={!nextCard}
                    onClick={() => nextCard && openDetail(nextCard.id)}
                    type="button"
                  >
                    <span className="detail-nav-label">
                      <img alt="" src={ASSETS.navNext} />
                      다음글
                    </span>
                    <span className="detail-nav-title">{nextCard ? nextCard.title : '제품이 없습니다.'}</span>
                  </button>
                </section>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
