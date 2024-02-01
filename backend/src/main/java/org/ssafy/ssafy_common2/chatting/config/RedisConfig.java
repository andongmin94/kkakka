package org.ssafy.ssafy_common2.chatting.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.ssafy.ssafy_common2.chatting.pubSub.RedisSubscriber;

/*
* 본문에는 간단히 제목만,
* 본문 밑에 설명 메모
* */
@Configuration
@Profile("local") // 0) 환경 설정
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String redisHost;

    @Value("${spring.data.redis.port}")
    private int redisPort;


    // 1) Redis-connector setting
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {

        return new LettuceConnectionFactory(redisHost, redisPort);
    }

    // 2) Setting Channel Topic
    @Bean
    public ChannelTopic channelTopic() {
        return new ChannelTopic("chatroom");
    }

    // 3) Setting Message Listener Container
    @Bean
    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory, MessageListenerAdapter listenerAdapter, ChannelTopic channelTopic) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(listenerAdapter, channelTopic);
        return container;
    }

    // 4) Setting listener Adapter
    @Bean
    public MessageListenerAdapter listenerAdapter (RedisSubscriber subscriber) {

        return  new MessageListenerAdapter(subscriber, "sendMessage");
    }



    // 5) Setting RedisTemplate
    @Bean
    public RedisTemplate<String, String> redisTemplate() {

        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));

        return redisTemplate;
    }


}

/*
* 0) application-{환경명} 적은 것은 Profile("환경명")으로 특정할 수 있다.
*    Profile 어노테이션은 런타임에 사용해야할 환경 설정 .yml 파일을 지정해주는 것을 말한다.
*
* 1) MySql의 JDBC 처럼 Redis에는 SpringBoot와의 연결을 담당하는 Lettuce와 Jedis가 있다. 우리는 Lettuce를 쓴다.
*
* 2) 단일 TOPIC 사용을 위한 ChannelTopic을 Bean 설정
*
* 3) MessageListenerContainer는 redis 내장 pub/sub 기능을 사용하기 위하여 설정에 추가 및 구현해야한다.
*    Pub는 RedisTemplate의 CRUD 기능을 이용할 것이라 건너뛰고, sub만 구현한다. 구현은 ListenerAdapter란 객체를 주입받아서 한다.
*
* 4) listenerAdapter는 다시 우리가 구현한 redisSubscriber를 이용하여 구현한다. redisSubscriber는 발행된 메세지에 대하여 대체한다.
*
* 5) CRUD를 위한 redisTemplate의 메타 데이터를 설정한다.
*    제공 받은 key 값과 value 값의 직렬화는 뭘로 할 것인지 연결은 뭘로 할 것인지 설정
*
 * */