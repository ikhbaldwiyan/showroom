import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
      width: 20px;
  }

  ::-webkit-scrollbar-track {
      background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
      background-color: #4A5568;
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
      background-color: #718096;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  
  header {
    border-bottom: 1px solid $gray-200;
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    background-color: ${({ theme }) => theme.header};
    border-bottom: ${({ theme }) => theme.borderBottom};
  
    .navbar {
      height: 70px;
  
      ul.navbar-nav {
        li.nav-item {
          &.active {
            a.nav-link {
              color: $primary;
              font-weight: 500;
            }
          }
          a {
            &.nav-link {
              letter-spacing: 1px;
              color: ${({ theme }) => theme.text};
              padding-left: 1rem;
              padding-right: 1rem;
              &:hover {
                color: $indigo
              }
            }
          }
        }
      }

      .profile-link{
        color: ${({ theme }) => theme.text};
      }
    }
  }

  .brand-text-icon {
    .logo {
      color: ${({ theme }) => theme.logoColor}
    }
    .showroom {
      color: ${({ theme }) => theme.showroom}
    }
  }
  
  footer {
    .list-group-item {
      background-color: ${({ theme }) => theme.body};
    }
  }

  .card-login {
    background-color: ${({ theme }) => theme.header};
    width: 600px;
  }
  `