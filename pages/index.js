import Head from 'next/head'
import { useState } from 'react'
import EventName from '../components/EventName'
import Leaderboard from '../components/Leaderboard'
import RangeSelect from '../components/RangeSelect'

export default function Home() {
  // Get props from Name and Range components to pass to the Leaderboard
  const [name, setName] = useState('')
  const [range, setRange] = useState('100')

  return (
    <div className="">
      <Head>
        <title>Game Leaderboard</title>
        <meta name="description" content="Game leaderboard built in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-evenly">
          <EventName
            name={name}
            onNameChange={(e) =>
              // Block entry of non-alphanumeric characters (except for spaces)
              setName(e.target.value.replace(/[^0-9a-zA-Z ]+/gi, ''))
            }
          />
          <RangeSelect
            range={range}
            updateRange={(e) => setRange(e.target.value)}
          />
        </div>
        <Leaderboard name={name} range={range} />
      </main>
    </div>
  )
}
