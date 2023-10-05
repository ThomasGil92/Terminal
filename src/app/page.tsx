import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <form>
        <input type="text" className='styles.main-input'/>
      </form>
    </main>
  )
}
