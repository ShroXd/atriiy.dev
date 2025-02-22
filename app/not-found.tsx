import FuzzyText from './components/FuzzyText/FuzzyText'

export default function NotFound() {
  return (
    <section>
      <div className='mb-12'>
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.4} enableHover={true}>
          404
        </FuzzyText>
      </div>
      <p className='mb-4'>The page you are looking for does not exist.</p>
    </section>
  )
}
