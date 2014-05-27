module Api
  class CommentsController < ApiController

    def index
      @comments = Card.find(params[:card_id]).comments
      render :index
    end

    # def show
    #   @comment = Comment.find(params[:id])
    #   # puts this shit in to the partial
    #   render partial: "api/comments/comment", locals: { comment: @comment }
    # end
    #
    def create
      @comment = Comment.new(comment_params)
      if @comment.save
        render partial: "api/comments/comment", locals: { comment: @comment }
      else
        # render json: { errors: @comment.errors.full_messages }, status 422
      end
    end

    # def update
    #   @comment = Comment.find(params[:id])
    #   if @comment.update_attributes(comment_params)
    #     render partial: "api/comments/comment", locals: {comment: @comment}
    #   else
    #     render json: { errors: @comment.errors.full_messages }, status 422
    #   end
    # end
    #
    def destroy
      Comment.find(params[:id]).try(:destroy)
      render json: nil
    end

    private

    def comment_params
      params.require(:comment).permit(:card_id, :user_id, :body)
    end

  end
end