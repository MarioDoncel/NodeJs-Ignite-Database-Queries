import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder().where(`title ILIKE :param`, { param: `%${param}%` }).getMany()
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) from games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<any> {

    return this.repository.query(`SELECT u.* FROM users_games_games uga INNER JOIN games g ON uga."gamesId" = g.id INNER JOIN users u ON uga."usersId" = u.id where g.id = $1`, [id])

  }
}
