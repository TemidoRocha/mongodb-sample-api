import { ObjectId } from 'mongodb';

export interface Filters {
  genre?: string;
  cast?: string;
  text?: string;
}

export interface Pagination {
  page: number;
  VALUES_PER_PAGE: number;
}

export interface Company {
  _id: ObjectId;
  name: string;
  permalink: string;
  crunchbase_url: string;
  homepage_url: string;
  blog_url: string;
  blog_feed_url: string;
  twitter_username: string;
  category_code: string;
  number_of_employees: number;
  founded_year: number;
  founded_month: number;
  founded_day: number;
  deadpooled_year: number;
  deadpooled_month: number;
  deadpooled_day: number;
  deadpooled_url: string;
  tag_list: string;
  alias_list: string;
  email_address: string;
  phone_number: string;
  description: string;
  created_at: string;
  updated_at: string;
  overview: string;
}

export interface GetAirCompanies {
  companiesList: Company[];
  totalNumResults: number;
  page: number;
  entries_per_page: number;
}
