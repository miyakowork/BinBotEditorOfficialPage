import { useState } from 'react'
import { faqItems } from '../content/site'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="faq section" id="faq" aria-labelledby="faq-title">
      <div className="section-kicker">常见问题 / 08</div>
      <h2 id="faq-title">在开始之前。</h2>
      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isOpen = openId === item.id
          const answerId = `faq-answer-${item.id}`
          return (
            <article className="faq-item" key={item.id}>
              <button
                type="button"
                aria-label={item.question}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="faq-number">0{index + 1}</span>
                <span>{item.question}</span>
                <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen ? <p id={answerId}>{item.answer}</p> : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
