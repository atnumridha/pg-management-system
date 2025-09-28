package com.pgms;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class SpaWebConfig implements WebMvcConfigurer {
    private final ResourceLoader resourceLoader;

    public SpaWebConfig(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/**")
            .addResourceLocations("classpath:/static/")
            .resourceChain(true)
            .addResolver(new PathResourceResolver() {
                @Override
                protected Resource getResource(String resourcePath, Resource location) throws IOException {
                    // Exclude /api
                    AntPathMatcher matcher = new AntPathMatcher();
                    if (matcher.match("api/**", resourcePath)) {
                        return null;
                    }
                    Resource requested = location.createRelative(resourcePath);
                    if (requested.exists() && requested.isReadable()) {
                        return requested;
                    }
                    // Only serve index.html for non-static (no dot) and not starting with api/
                    if (!resourcePath.contains(".") && !resourcePath.startsWith("api/")) {
                        return location.createRelative("index.html");
                    }
                    return null;
                }
            });
    }
}
