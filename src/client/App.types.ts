import { RouteProps } from 'react-router-dom';

export interface AppProps extends Route {}

export interface Route {
  route: { routes: RouteProps[] };
}

export interface SetLinkLoadingPayload {
  loadingSlug: string;
}

export interface SetUtilityPayload {
  utility: Utility;
}

export interface AppState extends AppData {
  loadingSlug: string;
  utility: Utility;
  loading: boolean;
  error: boolean;
}

export interface AppData {
  siteSettings: SiteSettings;
  navItems?: NavItemsEntityOrFooterNavItemsEntity[];
  footerNavItems?: NavItemsEntityOrFooterNavItemsEntity[];
  projectTags?: Tags[];
  projectCategories?: Tags[];
  blogTags?: Tags[];
  blogCategories?: Tags[];
  subfooter: Subfooter;
}

export interface SiteSettings {
  mainLogo: MainLogoOrImagesEntityOrImage;
  cv: Cv;
}

export interface MainLogoOrImagesEntityOrImage {
  alt: string;
  title: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Sizes {
  image: string;
  image2x: string;
}

export interface Cv {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
}

export interface NavItemsEntityOrFooterNavItemsEntity {
  id: number;
  slug: string;
  title: string;
}

export interface Tags {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  term_order: string;
}

export interface Subfooter {
  about: About;
  latestTweets: LatestTweets;
  instagram: Instagram;
  contact: Contact;
}

export interface About {
  title: string;
  content: string;
  link_text: string;
  link: Link;
}

export interface Link {
  title: string;
  url: string;
  target: string;
}

export interface LatestTweets {
  title: string;
  link_text?: string;
  link?: Link;
  tweets?: TweetsEntity[];
}

export interface TweetsEntity {
  date: string;
  id: number;
  idStr: string;
  text: string;
}

export interface Instagram {
  title: string;
  link_text?: string;
  link?: Link;
  images?: MainLogoOrImagesEntityOrImage[];
}

export interface Contact {
  title: string;
  image: MainLogoOrImagesEntityOrImage;
  name: string;
  number: string;
  email: string;
  link_text: string;
  link: Link;
}

export interface Utility {
  isNavToggled: boolean;
  isSearchToggled: boolean;
  isMenuBtnToggled: boolean;
}
