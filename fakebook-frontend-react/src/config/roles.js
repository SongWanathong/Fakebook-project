// component's config object.
const components = {
    login: {
      component: 'Login',
      url: '/login',
    },
    signup: {
      component: 'Signup',
      url: '/signup',
    },
    changepassword: {
      component: 'Changepassword',
      url: '/changepassword',
    },
    friend: {
      component: 'Friend',
      url: '/friends',
    },
    feed: {
      component: 'Feed',
      url: '/feed',
    },
    friendProfile: {
      component: 'Friendprofile',
      url: '/profile',
    },
    home: {
      component: 'Home',
      url: '/',
    },
    profile: {
      component: 'Profile',
      url: '/my-profile',
    }
  };
  
  export default {
    //role name as a key.
    admin: {
      routes: [...Object.values(components)],
      redirect:'/admin',
      
    },
    user: {
      routes: [
        components.changepassword,
        components.friend,
        components.home,
        components.profile,
        components.friendProfile,
        components.feed


      ],
      redirect:'/admin'

    },
    guest: {
      routes: [
        components.login,
        components.signup,
      ],
      redirect:'/login'

    }
  }