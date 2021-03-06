/*
import { getLoggerFor } from '../../logging/LogUtil';
import type { ResourceStore } from '../../storage/ResourceStore';
import { BadRequestHttpError } from '../../util/errors/BadRequestHttpError';
import { NotImplementedHttpError } from '../../util/errors/NotImplementedHttpError';
import { CreatedResponseDescription } from '../output/response/CreatedResponseDescription';
import { ResetResponseDescription } from '../output/response/ResetResponseDescription';
import type { ResponseDescription } from '../output/response/ResponseDescription';
import type { OperationHandlerInput } from './OperationHandler';
import { OperationHandler } from './OperationHandler';
*/

import { getLoggerFor } from '@solid/community-server';
import type { ResourceStore } from '@solid/community-server';
import { BadRequestHttpError } from '@solid/community-server';
import { NotImplementedHttpError } from '@solid/community-server';
import { CreatedResponseDescription } from '@solid/community-server';
import { ResetResponseDescription } from './ResetResponseDescription';
import type { ResponseDescription } from '@solid/community-server';
import type { OperationHandlerInput } from '@solid/community-server';
import { OperationHandler } from '@solid/community-server';


/**
 * Handles PUT {@link Operation}s.
 * Calls the setRepresentation function from a {@link ResourceStore}.
 */
export class PutOperationHandler2 extends OperationHandler {
  protected readonly logger = getLoggerFor(this);

  private readonly store: ResourceStore;

  public constructor(store: ResourceStore) {
    super();
    this.store = store;
  }

  public async canHandle({ operation }: OperationHandlerInput): Promise<void> {
    if (operation.method !== 'PUT') {
      throw new NotImplementedHttpError('This handler only supports PUT operations');
    }
  }

  public async handle({ operation }: OperationHandlerInput): Promise<ResponseDescription> {
    // Solid, §2.1: "A Solid server MUST reject PUT, POST and PATCH requests
    // without the Content-Type header with a status code of 400."
    // https://solid.github.io/specification/protocol#http-server
    if (!operation.body.metadata.contentType) {
      this.logger.warn('PUT requests require the Content-Type header to be set');
      throw new BadRequestHttpError('PUT requests require the Content-Type header to be set');
    }
    // A more efficient approach would be to have the server return metadata indicating if a resource was new
    // See https://github.com/solid/community-server/issues/632
    const exists = await this.store.resourceExists(operation.target, operation.conditions);
    await this.store.setRepresentation(operation.target, operation.body, operation.conditions);
    const body = await this.store.getRepresentation(operation.target, operation.preferences, operation.conditions);
    if (exists) {
      return new ResetResponseDescription(body.metadata,body.data);
    }
    return new CreatedResponseDescription(operation.target);
  }
}
