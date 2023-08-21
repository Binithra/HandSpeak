export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS : "SET_ALL_USERS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ALL_BOOKS: "SET_ALL_BOOKS",
  SET_QUIZ: "SET_QUIZ",
  SET_ALL_VIDEOS: "SET_ALL_VIDEOS",
}

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

     case actionType.SET_ALL_USERS:
        return {
            ...state,
            allUsers: action.allUsers,
        };


        case actionType.SET_ALL_BOOKS:
        return {
            ...state,
            allBooks: action.allBooks,
        };

        case actionType.SET_QUIZ:
        return {
            ...state,
            quiz: action.quiz,
        };

        case actionType.SET_ALL_VIDEOS:
          return {
              ...state,
              allVideos: action.allVideos,
          };


    default:
      return state;
  }
};

export default reducer;
