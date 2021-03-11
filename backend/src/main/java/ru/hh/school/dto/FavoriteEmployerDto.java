package ru.hh.school.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import ru.hh.school.entity.Popularity;
import ru.hh.school.serialize.LocalDateDeserializer;
import ru.hh.school.serialize.LocalDateSerializer;

import java.time.LocalDate;

public class FavoriteEmployerDto extends EmployerDtoById {

    @JsonProperty("date_create")
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate dateCreate;

    private Popularity popularity = Popularity.REGULAR;

    @JsonProperty("views_count")
    private int viewsCount = 0;

    private String comment;

    public FavoriteEmployerDto() {}

    public FavoriteEmployerDto(
            int id,
            String name,
            String description,
            String comment,
            LocalDate dateCreate,
            int viewsCount,
            Popularity popularity,
            AreaDto area) {
        super(id, name, description, area);
        this.comment = comment;
        this.dateCreate = dateCreate;
        this.popularity = popularity;
        this.viewsCount = viewsCount;
    }

    public FavoriteEmployerDto(int id, String name, String description, AreaDto area, String comment) {
        super(id, name, description, area);
        this.comment = comment;
    }

    public FavoriteEmployerDto(EmployerDtoById employerDtoById, String comment) {
        super(employerDtoById.getId(), employerDtoById.getName(), employerDtoById.getDescription(), employerDtoById.getArea());
        this.comment = comment;
    }

    public LocalDate getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(LocalDate dateCreate) {
        this.dateCreate = dateCreate;
    }

    public Popularity getPopularity() {
        return popularity;
    }

    public void setPopularity(Popularity popularity) {
        this.popularity = popularity;
    }

    public int getViewsCount() {
        return viewsCount;
    }

    public void setViewsCount(int viewsCount) {
        this.viewsCount = viewsCount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    @Override
    public String toString() {
        return "FavoriteEmployerDto[" +
                "id=" + id +
                ", name=" + name +
                ", dateCreate=" + dateCreate +
                ", popularity=" + popularity +
                ", viewsCount=" + viewsCount +
                ", area=" + area +
                ", comment=" + comment +
                ']';
    }
}
