import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define interfaces for the blog and author based on the API documentation
export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/api/blogs';

  /// Fetches all blogs from the API.
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  /// Fetches a single blog by its ID.
  getBlog(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  /// Creates a new blog.
  createBlog(blogData: { title: string; content: string }): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blogData);
  }

  /// Searches blogs by a query string.
  searchBlogs(query: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}?search=${query}`);
  }
}
