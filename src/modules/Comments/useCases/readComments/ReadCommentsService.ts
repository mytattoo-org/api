import { inject, injectable } from 'tsyringe'

import { TExecute } from './readComments.types'

import { formatComments } from '@modules/Comments/formatter'
import { ICommentsRepository } from '@modules/Comments/repositories/ICommentsRepository.types'
import { AppError } from '@modules/Error/models/AppError'

@injectable()
class ReadCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  execute: TExecute = async ({ post_id: postId, user_id: userId }) => {
    if (!postId && !userId) throw new AppError('postId or userId needed', 400)

    if (postId && userId)
      return {
        comments: formatComments(
          await this.commentsRepository.findByPostAndUserId({
            post_id: postId,
            user_id: userId
          })
        )
      }

    if (postId)
      return {
        comments: formatComments(
          await this.commentsRepository.findByPostId(postId)
        )
      }

    return {
      comments: formatComments(
        await this.commentsRepository.findByUserId(userId)
      )
    }
  }
}

export { ReadCommentsService }
