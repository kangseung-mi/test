import React, { useState } from 'react'
import './App.css'

function App() {
  const [expandedSections, setExpandedSections] = useState({
    productIntro: true,
    constructionCase: false,
    customerService: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="admin-header">
        <div className="header-logo">
          <div className="logo-icon">🏢</div>
          <span className="company-name">(유)다라건설</span>
        </div>
      </header>

      <div className="admin-layout">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {/* 제품소개 작성 Section */}
            <div className="nav-section">
              <div 
                className="nav-section-header"
                onClick={() => toggleSection('productIntro')}
              >
                <span>제품소개 작성</span>
                <span className="chevron">
                  {expandedSections.productIntro ? '▲' : '▶'}
                </span>
              </div>
              {expandedSections.productIntro && (
                <div className="nav-submenu">
                  <a href="#" className="nav-item active">모듈</a>
                  <a href="#" className="nav-item">인버터</a>
                </div>
              )}
            </div>

            {/* 시공사례 작성 Section */}
            <div className="nav-section">
              <div 
                className="nav-section-header"
                onClick={() => toggleSection('constructionCase')}
              >
                <span>시공사례 작성</span>
                <span className="chevron">
                  {expandedSections.constructionCase ? '▲' : '▶'}
                </span>
              </div>
              {expandedSections.constructionCase && (
                <div className="nav-submenu">
                  {/* Add sub-items here if needed */}
                </div>
              )}
            </div>

            {/* 고객센터 작성 Section */}
            <div className="nav-section">
              <div 
                className="nav-section-header"
                onClick={() => toggleSection('customerService')}
              >
                <span>고객센터 작성</span>
                <span className="chevron">
                  {expandedSections.customerService ? '▲' : '▶'}
                </span>
              </div>
              {expandedSections.customerService && (
                <div className="nav-submenu">
                  {/* Add sub-items here if needed */}
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            〉 제품소개 작성
          </div>

          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">모듈</h1>
            <button className="register-btn">등록</button>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="product-card">
                <div className="product-badge">
                  <span className="badge-icon">▶</span>
                  <span className="badge-text">HD현대에너지솔루션</span>
                </div>
                <div className="product-image">
                  <div className="solar-panel-placeholder">
                    {/* Solar panel image placeholder */}
                  </div>
                </div>
                <div className="product-info">
                  <p className="product-description">[HD현대에너지] 모듈 640W</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-btn">«</button>
            <button className="pagination-btn">‹</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-ellipsis">...</span>
            <button className="pagination-btn">10</button>
            <button className="pagination-btn">›</button>
            <button className="pagination-btn">»</button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
