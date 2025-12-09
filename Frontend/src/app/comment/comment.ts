import {Component, inject, Input} from '@angular/core';
import {CommentsService} from '../data/services/comments-service';


@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})
export class Comment {
  @Input() comment!: CommentData;
  @Input() admin!: boolean;
  @Input() id: string | undefined;
  commentService = inject(CommentsService);


  deleteComment(){
    this.commentService.deleteComment(this.comment.id).subscribe(response=>{
      window.location.reload();
    });
  }

}
