export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS : "SET_ALL_USERS",
  SET_ALL_BOOKS: "SET_ALL_BOOKS",
  SET_QUIZ: "SET_QUIZ",
  SET_ALL_VIDEOS: "SET_ALL_VIDEOS",
// filter types
  SET_FILTER_TERM: "SET_FILTER_TERM",
  // SET_CATEGORY_FILTER: "SET_CATEGORY_FILTER",
  SET_LEVEL_FILTER: "SET_LEVEL_FILTER",
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

          //FILTER CASE
          case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };

      case actionType.SET_CATEGORY_FILTER:
        return {
          ...state,
          categoryFilter: action.categoryFilter,
        };
  
      case actionType.SET_LEVEL_FILTER:
        return {
          ...state,
          levelFilter: action.levelFilter,
        };


    default:
      return state;
  }
};

export default reducer;
