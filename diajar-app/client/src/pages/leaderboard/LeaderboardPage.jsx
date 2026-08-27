import { useState } from 'react'
import { useLeaderboard } from '../../hooks/useLeaderboard'
import { Trophy, Medal, Award } from 'lucide-react'

const TIER_COLORS = {
  gold: 'text-yellow-400',
  silver: 'text-slate-300',
  bronze: 'text-orange-400',
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('global')
  const { data: res, isLoading } = useLeaderboard(period)
  const users = res?.success ? res.data : []

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />
      case 2: return <Medal className="w-6 h-6 text-slate-300" />
      case 3: return <Award className="w-6 h-6 text-orange-400" />
      default: return <span className="w-6 h-6 flex items-center justify-center text-slate-400 font-bold">{rank}</span>
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
            Papan Peringkat
          </h1>
          <p className="text-slate-500">
            Lihat peringkat pengguna lainnya berdasarkan total EXP yang dikumpulkan.
          </p>
        </div>

        {/* Period Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 rounded-lg p-1 text-sm font-semibold">
            <button
              onClick={() => setPeriod('global')}
              className={`px-5 py-2 rounded-md transition ${
                period === 'global'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setPeriod('weekly')}
              className={`px-5 py-2 rounded-md transition ${
                period === 'weekly'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Mingguan
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500">Belum ada data peringkat.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-12 bg-navy text-white py-3 px-6 font-bold text-sm">
              <div className="col-span-1">#</div>
              <div className="col-span-7">Nama</div>
              <div className="col-span-2 text-center">Level</div>
              <div className="col-span-2 text-right">Total EXP</div>
            </div>

            {users.map((user, idx) => {
              const rank = user.rank || idx + 1
              const tier = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'default'
              return (
                <div
                  key={user.user_id || idx}
                  className={`grid grid-cols-12 py-3 px-6 items-center border-b border-slate-100 last:border-0 transition ${
                    tier !== 'default' ? 'bg-slate-50/50' : ''
                  }`}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>
                  <div className="col-span-7 flex items-center gap-3">
                    <span className={`font-bold ${tier !== 'default' ? TIER_COLORS[tier] : 'text-slate-700'}`}>
                      {user.name}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-semibold text-slate-700">
                      {user.level || 1}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-bold text-primary">
                      {user.total_exp || 0}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
