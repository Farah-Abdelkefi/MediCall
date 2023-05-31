import { Resolver, Query, Subscription, Args } from '@nestjs/graphql';
import { ConsultationEntity } from './entities/consultation.entity';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';


@Resolver(() => ConsultationEntity)
export class ConsultationResolver {

  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}
  @Query(()=> String)
   sayHello(): string{
    return 'Hello';
   }

   @Subscription(() => ConsultationEntity)
  consultationAccepted(@Args('id') id: string): AsyncIterator<ConsultationEntity> {
    return this.pubSub.asyncIterator('consultationAccepted');
  }
    
  
  }