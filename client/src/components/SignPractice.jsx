import React from 'react'
import Header from './Header'

const SignPractice = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="mockup-code items-center">
  <pre data-prefix="1"><code>sign detection</code></pre> 
  <pre data-prefix="2"><code>installing...</code></pre> 
  <pre data-prefix="3" className="bg-warning text-warning-content"><code>under maintenece !</code></pre>
</div>
    </div>
  );
}

export default SignPractice