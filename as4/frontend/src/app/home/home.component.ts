import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  computed,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        @if (user(); as user) {
        <div class="user-info">
          <div>
            <h1 class="user-name">{{ user.name }}</h1>
            <p class="user-email">{{ user.email }}</p>
          </div>
          @if (!isProfilePage()) {
          <button class="logout-button" (click)="onLogout()">Logout</button>
          }
        </div>
        }
        <div class="blog-feed">
          <h2 class="feed-title">
            {{ isProfilePage() ? "User's Blogs" : 'My Blogs' }}
          </h2>
          @for (blog of blogs(); track blog._id) {
          <div class="blog-post">
            <div class="post-author">
              <a [routerLink]="['/user', blog.author._id]" class="author-link">
                {{ blog.author.name }} - {{ blog.author.email }}
              </a>
            </div>
            <h3 class="blog-title">{{ blog.title }}</h3>
            <p class="blog-content">{{ blog.content }}</p>
            <p class="blog-date">{{ blog.createdAt | date : 'medium' }}</p>
          </div>
          } @empty {
          <p>No blogs to display.</p>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  blogs = signal<Blog[]>([]);
  profileUser = signal<User | null>(null);
  isProfilePage = signal(false);

  user = computed(() => {
    return this.isProfilePage()
      ? this.profileUser()
      : this.authService.currentUser();
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.isProfilePage.set(true);
        this.fetchUserProfile(userId);
        this.fetchBlogsForUser(userId);
      } else {
        // This is the /profile route
        this.isProfilePage.set(false);
        const currentUser = this.authService.currentUser();
        if (currentUser) {
          this.profileUser.set(currentUser);
          this.fetchBlogsForUser(currentUser._id);
        }
      }
    });
  }

  fetchUserProfile(userId: string): void {
    this.http
      .get<User>(`http://localhost:3001/api/users/${userId}`)
      .subscribe((user) => this.profileUser.set(user));
  }

  fetchBlogsForUser(userId: string): void {
    this.http
      .get<Blog[]>(`http://localhost:3001/api/blogs?user=${userId}`)
      .subscribe((blogs) => this.blogs.set(blogs));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
