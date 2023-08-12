import React from 'react'
import Header from './Header'
import { NavLink } from 'react-router-dom';

const Quiz = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="text-2xl font-semibold p-4 ">
        Select a section to start practice
      </div>
      <div className="flex-row center flex flex-wrap gap-4">
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />


        
      </div>
    </div>
  );
}

export const QuizCard = () => {
    return(
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
          <figure>
            <img className="w-48 object-cover"
              src="https://i.pinimg.com/564x/ae/d0/a4/aed0a4e946569a7d7f90acd7816ce79b.jpg"
              alt="leters"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Letters</h2>
            <p>Description</p>
            <div className="card-actions justify-end">
              <NavLink to={"/QuizScreen"}>
              <button className="btn btn-primary" >Learn Now !</button>
              </NavLink>
            </div>
          </div>
        </div>
        );
}

export default Quiz