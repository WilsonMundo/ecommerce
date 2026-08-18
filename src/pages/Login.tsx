import { useState } from 'react'
import { useNavigate } from 'react-router'

const TEST_EMAIL = 'demo@shopwave.com'
const TEST_PASSWORD = 'demo1234'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <path d="M12.07 0c.07.9-.26 1.8-.78 2.49-.52.69-1.37 1.23-2.2 1.17-.09-.86.31-1.76.82-2.41C10.43.57 11.32.06 12.07 0ZM15 13.16c-.38.87-.56 1.26-1.05 2.03-.68 1.04-1.64 2.33-2.83 2.34-1.06.01-1.33-.69-2.77-.68-1.44.01-1.74.69-2.8.68-1.19-.01-2.1-1.17-2.78-2.21C1.04 13.1.5 10.68 1.35 8.97c.6-1.2 1.73-1.96 2.92-1.97 1.15-.01 1.88.7 2.83.7.95 0 1.53-.71 2.9-.71 1.02-.01 2.08.56 2.77 1.52-2.43 1.33-2.04 4.8.23 6.65Z"/>
    </svg>
  )
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password. Use the demo credentials below.')
    }
  }

  const fillDemo = () => {
    setEmail(TEST_EMAIL)
    setPassword(TEST_PASSWORD)
    setError('')
  }

  const inputClass = (name: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-150 bg-white placeholder:text-[#b0a99e] ${
      focused === name
        ? 'border-[#c8f135] ring-2 ring-[#c8f135]/30'
        : 'border-[#ddd8d0] hover:border-[#b0a99e]'
    }`

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--background)' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(26,23,20,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-[#ddd8d0] px-8 py-10">

          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4" style={{ backgroundColor: 'var(--primary)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1714" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>
              Welcome back
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Demo credentials hint */}
          <button
            type="button"
            onClick={fillDemo}
            className="w-full mb-5 px-4 py-2.5 rounded-xl text-xs font-medium text-left border border-dashed transition-colors hover:bg-[#f7f5f2]"
            style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
          >
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>Demo account</span>
            {"  ·  "}
            {TEST_EMAIL}
            {"  ·  "}
            {TEST_PASSWORD}
            <span className="float-right mt-0.5 text-[10px] uppercase tracking-wider" style={{ color: 'var(--primary)', filter: 'brightness(0.75)' }}>tap to fill →</span>
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--foreground)' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                className={inputClass('email')}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  Password
                </label>
                <button type="button" className="text-xs font-medium transition-opacity hover:opacity-60" style={{ color: 'var(--muted-foreground)' }}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  className={inputClass('password') + ' pr-11'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                  tabIndex={-1}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs px-3 py-2 rounded-lg bg-red-50 text-red-600 border border-red-100">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 hover:brightness-95 active:scale-[0.98] mt-1"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>or continue with</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all hover:bg-[#f7f5f2] active:scale-[0.98]" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              <GoogleIcon /> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all hover:bg-[#f7f5f2] active:scale-[0.98]" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              <AppleIcon /> Apple
            </button>
          </div>

          <p className="text-center text-sm mt-7" style={{ color: 'var(--muted-foreground)' }}>
            {"Don't have an account?  "}
            <button type="button" className="font-semibold transition-opacity hover:opacity-70" style={{ color: 'var(--foreground)' }}>
              Create one
            </button>
          </p>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
          By signing in you agree to our{' '}
          <button type="button" className="underline underline-offset-2 hover:opacity-70">Terms</button>
          {' '}and{' '}
          <button type="button" className="underline underline-offset-2 hover:opacity-70">Privacy Policy</button>
        </p>
      </div>
    </div>
  )
}
