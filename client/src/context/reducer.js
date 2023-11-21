export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_BOOKS: "SET_ALL_BOOKS",
  SET_ALL_QUIZ: "SET_ALL_QUIZ",
  SET_ALL_VIDEOS: "SET_ALL_VIDEOS",
  // filter types
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_CATEGORY_FILTER: "SET_CATEGORY_FILTER",
  SET_LEVEL_FILTER: "SET_LEVEL_FILTER",

  SET_ALERT_TYPE: "SET_ALERT_TYPE",
  SET_ISVIDEO_PLAYING: "SET_ISVIDEO_PLAYING",
  SET_VIDEO_INDEX: "SET_VIDEO_INDEX",
  SET_VIDEO_CATO: "SET_VIDEO_CATO",

  SET_ISBOOK_VIEWING:"SET_ISBOOK_VIEWING",
  SET_BOOK_INDEX:"SET_BOOK_INDEX",

  SET_ISQUIZ_VIEWING: "SET_ISQUIZ_VIEWING",
  SET_QUIZ_INDEX: "SET_QUIZ_INDEX",
};

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

    case actionType.SET_ALL_QUIZ:
      return {
        ...state,
        allquiz: action.allquiz,
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

    case actionType.SET_ALERT_TYPE:
      return {
        ...state,
        alertType: action.alertType,
      };

    case actionType.SET_ISVIDEO_PLAYING:
      return {
        ...state,
        isVideoPlaying: action.isVideoPlaying,
      };

    case actionType.SET_VIDEO_INDEX:
      return {
        ...state,
        videoIndex: action.videoIndex,
      };

    case actionType.SET_VIDEO_CATO:
      return {
        ...state,
        videoIndex: action.videoCato,
      };

    case actionType.SET_ISBOOK_VIEWING:
      return {
        ...state,
        isBookViewing: action.isBookViewing,
      };

    case actionType.SET_BOOK_INDEX:
      return {
        ...state,
        bookIndex: action.bookIndex,
      };

      case actionType.SET_ISQUIZ_VIEWING:
      return {
        ...state,
        isQuizViewing: action.isQuizViewing,
      };

    case actionType.SET_QUIZ_INDEX:
      return {
        ...state,
        quizIndex: action.quizIndex,
      };

    default:
      return state;
  }
};

export default reducer;
