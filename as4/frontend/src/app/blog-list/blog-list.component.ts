import {
  Component,
  inject,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService, Blog } from '../services/blog.service';
import { RouterModule } from '@angular/router';
import { CreateBlogModalComponent } from '../create-blog-modal/create-blog-modal.component';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateBlogModalComponent, FormsModule],
  template: `
    <div class="header-container">
      <h2>Blogs</h2>
      <div class="search-bar">
        <input
          type="text"
          placeholder="Search blogs..."
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange($event)"
        />
      </div>
      @if (canCreate()) {
      <button class="btn btn-primary" (click)="showCreateModal.set(true)">
        Create Blog
      </button>
      }
    </div>

    @if (showCreateModal()) {
    <app-create-blog-modal
      (close)="showCreateModal.set(false)"
      (blogCreated)="loadBlogs()"
    />
    }

    <div class="blog-grid">
      @for (blog of blogs(); track blog._id) {
      <a [routerLink]="['/blog', blog._id]" class="blog-card">
        <div class="card-content">
          <h3 class="card-title">{{ blog.title }}</h3>
          <p class="card-author">by {{ blog.author.name }}</p>
          <p class="card-date">{{ blog.createdAt | date : 'medium' }}</p>
        </div>
      </a>
      } @empty {
      <p>No blogs found.</p>
      }
    </div>
  `,
  styleUrl: './blog-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  private authService = inject(AuthService);

  blogs = signal<Blog[]>([]);
  showCreateModal = signal(false);
  canCreate = signal(false);
  searchTerm = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.loadBlogs();
    const userRole = this.authService.currentUser()?.role;
    this.canCreate.set(userRole === 'admin' || userRole === 'creator');

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.blogService.searchBlogs(query))
      )
      .subscribe((blogs) => {
        this.blogs.set(blogs);
      });
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs.set(blogs);
    });
  }

  onSearchChange(query: string) {
    if (query.trim() === '') {
      this.loadBlogs();
    } else {
      this.searchSubject.next(query);
    }
  }
}
