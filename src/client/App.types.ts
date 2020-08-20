import {
  FetchAppDataAction,
  SetLinkLoadingAction,
  SetLinkLoadedAction,
  SetUtilityAction,
} from './App.actions';

export enum AppActionTypes {
  FETCH_APP_REQUEST = 'FETCH_APP_REQUEST',
  FETCH_APP_SUCCESS = 'FETCH_APP_SUCCESS',
  FETCH_APP_ERROR = 'FETCH_APP_ERROR',
  SET_LINK_LOADING = 'SET_LINK_LOADING',
  SET_LINK_LOADED = 'SET_LINK_LOADED',
  SET_UTILITY = 'SET_UTILITY',
}

export type Action =
  | FetchAppDataAction
  | SetLinkLoadingAction
  | SetLinkLoadedAction
  | SetUtilityAction;

export interface AppState extends AppData {
  loadingSlug: string;
  utility: Utility;
  loading: boolean;
  error: boolean;
}

export interface AppData {
  siteSettings: SiteSettings;
  navItems?: NavItemsEntityOrFooterNavItemsEntity[] | [];
  footerNavItems?: NavItemsEntityOrFooterNavItemsEntity[] | [];
  projectTags?:
    | ProjectTagsEntityOrProjectCategoriesEntityOrBlogTagsEntityOrBlogCategoriesEntity[]
    | [];
  projectCategories?:
    | ProjectTagsEntityOrProjectCategoriesEntityOrBlogTagsEntityOrBlogCategoriesEntity[]
    | [];
  blogTags?:
    | ProjectTagsEntityOrProjectCategoriesEntityOrBlogTagsEntityOrBlogCategoriesEntity[]
    | [];
  blogCategories?:
    | ProjectTagsEntityOrProjectCategoriesEntityOrBlogTagsEntityOrBlogCategoriesEntity[]
    | [];
  subfooter: Subfooter | {};
}

export interface SiteSettings {
  mainLogo: MainLogoOrImagesEntityOrImage | {};
  cv: Cv;
}

export interface MainLogoOrImagesEntityOrImage {
  alt: string;
  title: string;
  width: number;
  height: number;
  sizes: Sizes | {};
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

export interface ProjectTagsEntityOrProjectCategoriesEntityOrBlogTagsEntityOrBlogCategoriesEntity {
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
  link_text: string;
  link: Link;
  tweets?: TweetsEntity[] | [];
}

export interface TweetsEntity {
  date: string;
  id: number;
  idStr: string;
  text: string;
}

export interface Instagram {
  title: string;
  images?: MainLogoOrImagesEntityOrImage[] | [];
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
