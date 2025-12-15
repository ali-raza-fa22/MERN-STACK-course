import {
  Component,
  output,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ServerError {
  path: string;
  message: string;
}

@Component({
  selector: 'app-create-blog-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="modal-backdrop" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Create New Blog</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" [(ngModel)]="title" />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows="6"
              [(ngModel)]="content"
            ></textarea>
          </div>

          @if (errors()) {
          <div class="error-messages">
            @for (error of errors(); track error.path) {
            <p>{{ error.message }}</p>
            }
          </div>
          }

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Create</button>
            <button type="button" class="btn" (click)="onClose()">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './create-blog-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBlogModalComponent {
  close = output<void>();
  blogCreated = output<void>();

  private blogService = inject(BlogService);

  title = '';
  content = '';
  errors = signal<ServerError[] | null>(null);

  onSubmit() {
    this.blogService
      .createBlog({ title: this.title, content: this.content })
      .subscribe({
        next: () => {
          this.blogCreated.emit();
          this.onClose();
        },
        error: (err: HttpErrorResponse) => {
          if (err.error && err.error.errors) {
            this.errors.set(err.error.errors);
          } else if (err.error && err.error.message) {
            this.errors.set([{ path: 'general', message: err.error.message }]);
          } else {
            this.errors.set([
              { path: 'unknown', message: 'An unknown error occurred.' },
            ]);
          }
        },
      });
  }

  onClose() {
    this.close.emit();
  }
}
