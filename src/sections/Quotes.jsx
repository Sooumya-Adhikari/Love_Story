import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import SectionHeading from '../components/SectionHeading.jsx'
import ParticlesLayer from '../components/ParticlesLayer.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function Quotes() {
  const { content } = useContent()

  return (
    <section className="relative py-24 px-6 md:px-10 overflow-hidden">
      <ParticlesLayer kinds={['sparkle', 'heart']} count={5} />
      <SectionHeading eyebrow="Words We Love" title="Romantic Quotes" />

      <div className="max-w-2xl mx-auto relative z-10">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          loop
        >
          {content.quotes.map((q) => (
            <SwiperSlide key={q.id}>
              <div className="text-center px-6 py-10">
                <span className="font-display text-6xl text-filigree leading-none">“</span>
                <p className="font-display italic text-2xl md:text-3xl -mt-4">{q.text}</p>
                <span className="block mt-6 text-xs uppercase tracking-[0.3em] text-ember">{q.author}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
