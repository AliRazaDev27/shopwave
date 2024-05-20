export default function registrationForm() {
  return (
    <div className="container mx-auto px-96 flex flex-col justify-evenly h-screen">
      <div>
        <h1>Create an Account</h1>
        <p>Let&apos;s get started with your 30 day free trial.</p>
      </div>
      <div>
        <form action="" className="flex flex-col gap-4">

          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="border-0 border-b appearance-none focus:ring-0" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="border-0 border-b appearance-none focus:ring-0" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="border-0 border-b appearance-none focus:ring-0" />
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <button className="py-4 bg-black text-white border border-black rounded-3xl text-lg font-semibold">Create Account</button>
        <button className="py-4 bg-black text-white border border-black rounded-3xl text-lg font-semibold">Sign up with Google</button>
      </div>
    </div>
  )
}
