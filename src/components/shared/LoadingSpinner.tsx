
const LoadingSpinner = () => {
  return (
    <div className='container h-[80vh] flex-center'>
      <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" stroke="#3498db">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(2 2)" strokeWidth="4">
            <circle strokeOpacity=".1" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.8s"
                repeatCount="indefinite" />
            </path>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default LoadingSpinner