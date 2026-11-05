import { useState } from 'react'
import Login from './login.jsx'
import Register from './register.jsx'
import authRoles, { getAuthRole } from './authRoles.js'

function AuthPage() {
  const activePage = window.location.pathname
  const queryRole = getAuthRole(new URLSearchParams(window.location.search).get('role'))
  const [selectedRole, setSelectedRole] = useState(queryRole)
  const [method, setMethod] = useState(
    queryRole ? (activePage === '/register' ? 'register' : 'login') : null,
  )

  function changeRole() {
    setSelectedRole(null)
    setMethod(null)
    window.history.replaceState(null, '', '/auth')
  }

  return (
    <main className="h-[calc(100vh-76px)] bg-[#f0faf3] px-4 py-4 max-[760px]:h-[calc(100vh-110px)] max-[760px]:px-3 max-[760px]:py-1">
      {!selectedRole ? (
        <section className="mx-auto flex h-full max-w-3xl flex-col justify-center rounded-3xl bg-white p-4 shadow-xl sm:p-5 max-[760px]:rounded-2xl max-[760px]:p-2">
          <div className="mx-auto grid w-full max-w-[500px] grid-cols-2 gap-3 max-[760px]:gap-2">
            {authRoles.map((role) => (
              <a
                className="group relative aspect-square overflow-hidden rounded-xl border border-[#dce8dd] bg-[#183b27] text-left no-underline shadow-sm transition hover:-translate-y-0.5 hover:border-green-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 max-[760px]:rounded-lg"
                href={`/login?role=${role.id}`}
                key={role.id}
              >
                <img
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                  src={role.image}
                  alt={role.imageAlt}
                />
                <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/85 via-black/55 to-transparent px-3 pb-3 pt-10 max-[760px]:px-2 max-[760px]:pb-2 max-[760px]:pt-8">
                  <span className="block text-base font-bold text-white max-[760px]:text-sm">
                    {role.name}
                  </span>
                  <span className="mt-0.5 block text-xs leading-5 text-white/90 max-[760px]:hidden">
                    {role.description}
                  </span>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-white max-[760px]:mt-1">
                    Continue <span aria-hidden="true">→</span>
                  </span>
                </span>
              </a>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-gray-500 max-[760px]:mt-0">
            <a className="font-medium text-green-700 hover:underline" href="/">
              ← Back to Home
            </a>
          </p>
        </section>
      ) : method === 'register' ? (
        <Register
          role={selectedRole}
          onBack={() => setMethod('login')}
          onSwitchMode={() => setMethod('login')}
        />
      ) : (
        <Login
          role={selectedRole}
          onBack={changeRole}
          onSwitchMode={() => setMethod('register')}
        />
      )}
    </main>
  )
}

export default AuthPage
