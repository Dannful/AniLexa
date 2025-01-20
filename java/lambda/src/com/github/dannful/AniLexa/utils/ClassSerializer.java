package com.github.dannful.AniLexa.utils;

import java.lang.reflect.Field;

public class ClassSerializer {

    public static String formatClassFields(Class<?> clazz) {
        StringBuilder result = new StringBuilder();
        for (Field field : clazz.getDeclaredFields()) {
            result.append(" ");
            if (field.getType() != int.class && field.getType() != String.class && field.getType() != float.class && field.getType() != Integer.class) {
                result.append(field.getName()).append(" {");
                result.append(formatClassFields(field.getType()));
                result.append("}");
                continue;
            }
            result.append(field.getName());
        }
        return result.toString().trim();
    }
}
