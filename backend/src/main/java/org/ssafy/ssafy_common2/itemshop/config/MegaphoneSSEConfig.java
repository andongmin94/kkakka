package org.ssafy.ssafy_common2.itemshop.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;

@Configuration
public class MegaphoneSSEConfig {

    @Bean
    public FilterRegistrationBean<OpenEntityManagerInViewFilter> openEntityManagerInViewFilter() {
        FilterRegistrationBean<OpenEntityManagerInViewFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new OpenEntityManagerInViewFilter());
        registrationBean.addUrlPatterns("/api/*"); // 해당 URL 패턴에 대해서만 필터를 적용
        registrationBean.setName("OpenEntityManagerInViewFilter");
        registrationBean.setOrder(1); // 필터 순서 지정
        registrationBean.addInitParameter("entityManagerFactoryBeanName", "entityManagerFactory");
        registrationBean.addInitParameter("singleSession", "true");
        return registrationBean;
    }
}
