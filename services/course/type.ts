// services/course/type.ts
export interface Course {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  status: string;
  category: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
  };
}

export interface CourseListResponse {
  data: Course[];
  meta: {
    current_page: number;
    per_page: string;
    from: number;
    to: number;
  };
  links: {
    next: string | null;
    prev: string | null;
  };
}
