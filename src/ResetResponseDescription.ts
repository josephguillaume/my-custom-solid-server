/*
import type { Readable } from 'stream';
import type { Guarded } from '../../../util/GuardedStream';
import type { RepresentationMetadata } from '../../representation/RepresentationMetadata';
import { ResponseDescription } from './ResponseDescription';
*/
import type { Readable } from 'stream';
import type { Guarded } from '@solid/community-server';
import type { RepresentationMetadata } from '@solid/community-server';
import { ResponseDescription } from '@solid/community-server';

/**
 * Corresponds to a 205 response.
 */
export class ResetResponseDescription extends ResponseDescription {
  /**
     * @param metadata - Metadata concerning the response.
     * @param data - Potential data. @ignored
  */
	public constructor(metadata: RepresentationMetadata, data?: Guarded<Readable>) {
		        super(205, metadata, data);
	}
}
