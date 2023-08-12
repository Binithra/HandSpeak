import React from 'react'
import Header from './Header'

const Videos = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="text-2xl font-semibold p-4 ">
        Video Lessons for you 
      </div>
      <div className="flex-row center flex flex-wrap gap-4">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />


        
      </div>
    </div>
  )
}

export const VideoCard = () => {
    return(
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
          <figure>
            <img className="w-48 object-cover"
              src="https://i.pinimg.com/564x/a5/68/09/a56809750151cbef3d2670d5d90275fe.jpg"
              alt="letters"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Letters</h2>
            <p>Description</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch Now !</button>
            </div>
          </div>
        </div>
        );
}

export default Videos