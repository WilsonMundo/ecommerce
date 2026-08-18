import { useState } from 'react'
import { useNavigate } from 'react-router'

const stats = [
  {
    label: 'Total Revenue',
    value: '$48,295',
    change: '+12.4%',
    up: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: 'Orders',
    value: '1,384',
    change: '+8.1%',
    up: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    label: 'Customers',
    value: '9,741',
    change: '+3.7%',
    up: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Return Rate',
    value: '2.3%',
    change: '-0.5%',
    up: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
      </svg>
    ),
  },
]

const orders = [
  { id: '#SW-4821', customer: 'Valentina Cruz', product: 'Wireless Headphones Pro', date: 'Aug 17, 2026', total: '$149.00', status: 'Delivered' },
  { id: '#SW-4820', customer: 'Marco Delgado', product: 'Leather Tote Bag', date: 'Aug 17, 2026', total: '$89.50', status: 'Processing' },
  { id: '#SW-4819', customer: 'Amara Osei', product: 'Minimalist Watch', date: 'Aug 16, 2026', total: '$215.00', status: 'Delivered' },
  { id: '#SW-4818', customer: 'Lena Fischer', product: 'Running Sneakers', date: 'Aug 16, 2026', total: '$120.00', status: 'Shipped' },
  { id: '#SW-4817', customer: 'Jin Park', product: 'Ceramic Mug Set', date: 'Aug 15, 2026', total: '$42.00', status: 'Cancelled' },
  { id: '#SW-4816', customer: 'Sofia Romero', product: 'Yoga Mat Premium', date: 'Aug 15, 2026', total: '$68.00', status: 'Delivered' },
]

const topProducts = [
  { name: 'Wireless Headphones Pro', sales: 342, revenue: '$50,958', pct: 88 },
  { name: 'Minimalist Watch', sales: 218, revenue: '$46,870', pct: 71 },
  { name: 'Leather Tote Bag', sales: 197, revenue: '$17,581', pct: 64 },
  { name: 'Running Sneakers', sales: 153, revenue: '$18,360', pct: 49 },
  { name: 'Yoga Mat Premium', sales: 130, revenue: '$8,840', pct: 42 },
]

const statusColor: Record<string, string> = {
  Delivered: 'bg-emerald-50 text-emerald-700',
  Processing: 'bg-amber-50 text-amber-700',
  Shipped: 'bg-blue-50 text-blue-700',
  Cancelled: 'bg-red-50 text-red-600',
}

const navItems = [
  { label: 'Dashboard', active: true, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { label: 'Orders', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { label: 'Products', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
  { label: 'Customers', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: 'Analytics', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { label: 'Settings', active: false, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
]

// Mini sparkline bars (static visual)
const sparkData = [40, 65, 50, 80, 60, 90, 75, 95, 70, 88, 82, 100]

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--background)' }}>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col w-56 bg-white border-r transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ backgroundColor: 'var(--primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1714" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <span className="font-semibold text-base tracking-tight" style={{ color: 'var(--foreground)' }}>ShopWave</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                item.active
                  ? 'text-[#1a1714]'
                  : 'hover:bg-[#f7f5f2]'
              }`}
              style={item.active ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' } : { color: 'var(--muted-foreground)' }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--primary)', color: '#1a1714' }}>V</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: 'var(--foreground)' }}>Valentina Cruz</p>
              <p className="text-[10px] truncate" style={{ color: 'var(--muted-foreground)' }}>Admin</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="hover:opacity-60 transition-opacity"
              style={{ color: 'var(--muted-foreground)' }}
              title="Sign out"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)} style={{ color: 'var(--muted-foreground)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>Dashboard</h2>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Monday, August 18 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-[#f7f5f2] transition-colors" style={{ color: 'var(--muted-foreground)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--primary)', color: '#1a1714' }}>V</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)' }}>
                    {s.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Revenue chart + Top products */}
          <div className="grid lg:grid-cols-3 gap-4">

            {/* Revenue sparkline */}
            <div className="lg:col-span-2 bg-white rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Revenue Overview</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Last 12 months</p>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)' }}>2026</span>
              </div>
              {/* Bar chart */}
              <div className="flex items-end gap-1.5 h-32">
                {sparkData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-md transition-all"
                      style={{
                        height: `${v}%`,
                        backgroundColor: i === sparkData.length - 1 ? 'var(--primary)' : 'var(--secondary)',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {['S','O','N','D','E','F','M','A','M','J','J','A'].map((m, i) => (
                  <span key={i} className="flex-1 text-center text-[10px]" style={{ color: 'var(--muted-foreground)' }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Top products */}
            <div className="bg-white rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--foreground)' }}>Top Products</h3>
              <div className="space-y-4">
                {topProducts.map(p => (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium truncate pr-2" style={{ color: 'var(--foreground)' }}>{p.name}</span>
                      <span className="text-xs font-semibold shrink-0" style={{ color: 'var(--foreground)' }}>{p.revenue}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${p.pct}%`, backgroundColor: 'var(--primary)' }}
                      />
                    </div>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{p.sales} units sold</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Recent Orders</h3>
              <button className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--muted-foreground)' }}>View all →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Order', 'Customer', 'Product', 'Date', 'Total', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr
                      key={o.id}
                      className="transition-colors hover:bg-[#f7f5f2]"
                      style={{ borderBottom: i < orders.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                      <td className="px-5 py-3.5 text-xs font-mono font-medium" style={{ color: 'var(--muted-foreground)' }}>{o.id}</td>
                      <td className="px-5 py-3.5 text-xs font-medium" style={{ color: 'var(--foreground)' }}>{o.customer}</td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>{o.product}</td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>{o.date}</td>
                      <td className="px-5 py-3.5 text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{o.total}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusColor[o.status]}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
