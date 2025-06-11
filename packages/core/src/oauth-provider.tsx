import {
  FaApple,
  FaBitbucket,
  FaDiscord,
  FaFacebook,
  FaFigma,
  FaFly,
  FaGithub,
  FaLinkedin,
  FaSlack,
  FaSpotify,
  FaTwitch,
} from 'react-icons/fa';
import { FaGitlab, FaSquareXTwitter } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { RiNotionFill } from 'react-icons/ri';
import { SiKeycloak, SiZoom } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

import type { Provider } from '@supabase/supabase-js';

/**
 * SVG icon used only for Kakao login button.
 */
const KakaoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path
      fill="#3a1e1d"
      d="M511.5 203.5v36c-7.498 47.489-29.498 86.989-66 118.5-55.284 44.375-118.618 66.209-190 65.5-15.749-.024-31.415-.857-47-2.5-34.16 23.581-68.494 46.914-103 70-9.8333 2.167-13.6667-1.667-11.5-11.5 7.833-28.833 15.667-57.667 23.5-85.5-32.0361-16.923-59.5361-39.423-82.5-67.5C15.8353 299.834 4.00193 271.167-.5 239.5v-36c7.59119-48.093 29.9245-87.926 67-119.5C121.53 39.9708 184.53 18.4708 255.5 19.5s134.97-1 190 64.5c37.075 31.574 59.409 71.407 67 119.5z"
    />
  </svg>
);

/**
 * OAuth provider configuration (must include all values from Supabase's Provider type.)
 */
export const oauthProviderConfig: Record<
  Provider,
  {
    displayName: string;
    buttonClassName?: string;
    icon?: React.ReactNode;
  }
> = {
  apple: { displayName: 'Apple', icon: <FaApple /> },
  azure: { displayName: 'Azure', icon: <VscAzure /> },
  bitbucket: { displayName: 'Bitbucket', icon: <FaBitbucket /> },
  discord: { displayName: 'Discord', icon: <FaDiscord /> },
  facebook: { displayName: 'Facebook', icon: <FaFacebook /> },
  figma: { displayName: 'Figma', icon: <FaFigma /> },
  fly: { displayName: 'Fly', icon: <FaFly /> },
  github: { displayName: 'GitHub', icon: <FaGithub /> },
  gitlab: { displayName: 'GitLab', icon: <FaGitlab /> },
  google: { displayName: 'Google', icon: <FcGoogle /> },
  keycloak: { displayName: 'Keycloak', icon: <SiKeycloak /> },
  linkedin: { displayName: 'LinkedIn', icon: <FaLinkedin /> },
  linkedin_oidc: { displayName: 'LinkedIn', icon: <FaLinkedin /> },
  notion: { displayName: 'Notion', icon: <RiNotionFill /> },
  slack: { displayName: 'Slack', icon: <FaSlack /> },
  slack_oidc: { displayName: 'Slack', icon: <FaSlack /> },
  spotify: { displayName: 'Spotify', icon: <FaSpotify /> },
  twitch: { displayName: 'Twitch', icon: <FaTwitch /> },
  twitter: { displayName: 'Twitter', icon: <FaSquareXTwitter /> },
  workos: { displayName: 'WorkOS' },
  zoom: { displayName: 'Zoom', icon: <SiZoom /> },
  kakao: {
    displayName: 'Kakao',
    icon: <KakaoIcon />,
    buttonClassName: 'border-none bg-[#FEE500] hover:bg-[#FEE500]',
  },
};

/**
 * List of supported OAuth providers (extracted automatically from oauthProviderConfig keys.)
 */
export const OAUTH_PROVIDERS = Object.keys(oauthProviderConfig) as [Provider, ...Provider[]];

/**
 * OAuth provider type (same as Supabase's Provider type.)
 */
export type OAuthProvider = Provider;
