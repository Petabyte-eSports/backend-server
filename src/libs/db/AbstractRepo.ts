import {
  EntityTarget,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './BaseEntity';
import { readConnection, writeConnection } from './DatabaseModule';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractRepo<T extends BaseEntity> {
  protected constructor(protected readonly entityTarget: EntityTarget<T>) {}

  async save(entity: T): Promise<T> {
    return writeConnection.manager
      .getRepository(this.entityTarget)
      .save(entity);
  }

  async saveMany(entities: T[]): Promise<T[]> {
    return writeConnection.manager
      .getRepository(this.entityTarget)
      .save(entities);
  }

  async exists(where: FindOptionsWhere<T>) {
    const res = await readConnection
      .getRepository(this.entityTarget)
      .findOne({ where });

    return !!res === true;
  }

  //update
  async update(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const updateResult = await writeConnection.manager
      .getRepository(this.entityTarget)
      .update(where, partialEntity);

    if (!updateResult.affected) {
      console.warn('Entity not found with where', where);
      throw new NotFoundException('Entity not found.');
    }

    return this.findOne(where);
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
    select?: (keyof T)[],
  ): Promise<T | null> {
    const repository = readConnection.getRepository(this.entityTarget);
    const metadata = repository.metadata;
    const hasDeletedAtColumn = metadata.columns.some(
      (column) =>
        column.propertyName === 'is_deleted' ||
        column.databaseName === 'is_deleted',
    );
    const options: FindOneOptions<T> = {
      where,
      relations,
      select,
    };
    if (hasDeletedAtColumn) {
      options.where = {
        ...where,
        is_deleted: false,
      };
    }
    return repository.findOne(options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const updateResult = await writeConnection.manager
      .getRepository(this.entityTarget)
      .update(where, partialEntity);

    if (!updateResult.affected) {
      console.warn('Entity not found with where', where);
      throw new NotFoundException('Entity not found.');
    }

    return this.findOne(where);
  }

  async findPaginated(
    pageSize?: number,
    currentPage?: number,
    where?: Record<string, any>,
    order?: Record<string, any>,
    relations?: FindOptionsRelations<T>,
  ) {
    pageSize = pageSize ? pageSize : 10;
    currentPage = currentPage ? currentPage : 1;
    const offset = (currentPage - 1) * pageSize;

    const res = await readConnection
      .getRepository(this.entityTarget)
      .findAndCount({
        take: pageSize,
        skip: offset,
        where,
        order,
        relations,
      });

    const [data, total] = res;

    if (!data.length) {
      return {
        data: [],
      };
    }

    return {
      data,
      pagination: {
        total,
        pageSize,
        currentPage,
      },
    };
  }

  async find(
    where: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    order: Record<string, any> = {},
    relations?: FindOptionsRelations<T>,
  ) {
    return readConnection.getRepository(this.entityTarget).find({
      where,
      order,
      relations,
    });
  }

  //findOne By multiple conditions
  async findOneByMultipleConditions(
    where: FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>,
  ) {
    return readConnection.getRepository(this.entityTarget).findOne({
      where,
      relations,
    });
  }

  //find one
  async findOneOrFail(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ) {
    const entity = await readConnection
      .getRepository(this.entityTarget)
      .findOneOrFail({ where, relations });

    return entity;
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    const res = await writeConnection.manager
      .getRepository(this.entityTarget)
      .delete(where);

    return {
      status: !!res.affected,
    };
  }

  async search(
    keyword: string,
    columns: string[],
    entityName: string,
    pageSize: number = 10,
    currentPage: number = 1,
  ) {
    try {
      const queryBuilder = readConnection
        .getRepository(this.entityTarget)
        .createQueryBuilder(entityName);

      const whereConditions = columns.map(
        (column) => `${entityName}.${column} LIKE :term`,
      );

      const offset = (currentPage - 1) * pageSize;

      const [data, total] = await queryBuilder
        .where(`(${whereConditions.join(' OR ')})`, { term: `%${keyword}%` })
        .skip(offset)
        .take(pageSize)
        .getManyAndCount();

      return {
        data,
        pagination: {
          total,
          pageSize,
          currentPage,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async searchWithOutPagination(
    keyword: string,
    columns: string[],
    entityName: string,
  ) {
    try {
      const queryBuilder = readConnection
        .getRepository(this.entityTarget)
        .createQueryBuilder(entityName);

      const whereConditions = columns.map(
        (column) => `${entityName}.${column} LIKE :term`,
      );

      const [data] = await queryBuilder
        .where(`(${whereConditions.join(' OR ')})`, { term: `%${keyword}%` })
        .getManyAndCount();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async count() {
    try {
      const res = await readConnection.getRepository(this.entityTarget).count();

      return res;
    } catch (error) {
      throw error;
    }
  }

  async countWhere(where?: FindOptionsWhere<T>) {
    try {
      const res = await readConnection.getRepository(this.entityTarget).count({
        where,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async countWhereIn(
    where: FindOptionsWhere<T>,
    columnName: string,
    values: any[],
  ) {
    try {
      const res = await readConnection
        .getRepository(this.entityTarget)
        .count({ where: { ...where, [columnName]: In(values) } });
      return res;
    } catch (error) {
      throw error;
    }
  }

  //fetch all
  async fetchAll() {
    return readConnection.getRepository(this.entityTarget).find();
  }

  async sumWithConditions(
    columnName: string,
    where?: FindOptionsWhere<T>,
  ): Promise<number> {
    const queryBuilder = readConnection
      .getRepository(this.entityTarget)
      .createQueryBuilder();
    const sum = await queryBuilder
      .select(`SUM(${columnName})`, 'sum')
      .where(where)
      .getRawOne();
    return sum.sum || 0;
  }
}
