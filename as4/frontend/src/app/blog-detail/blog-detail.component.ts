import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, Blog } from '../services/blog.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (blog) {
    <div class="blog-detail-card">
      <h1 class="blog-title">{{ blog.title }}</h1>
      <div class="blog-meta">
        <span>
          By
          <a [routerLink]="['/user', blog.author._id]" class="author-link">
            {{ blog.author.name }}
          </a>
        </span>
        <span>&nbsp;on {{ blog.createdAt | date : 'longDate' }}</span>
      </div>
      <p class="blog-content">{{ blog.content }}</p>
    </div>
    } @else {
    <p>Loading blog...</p>
    }
  `,
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  blog: Blog | null = null;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.blogService.getBlog(id);
          }
          return [];
        })
      )
      .subscribe((blog) => {
        this.blog = blog;
      });
  }
}
