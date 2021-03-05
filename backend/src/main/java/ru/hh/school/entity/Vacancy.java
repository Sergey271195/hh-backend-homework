package ru.hh.school.entity;

import com.sun.istack.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "vacancy")
public class Vacancy {

    public Vacancy() {}

    @Id
    private int id;

    @NotNull
    private String name;

    @CreationTimestamp
    @Column(name = "date_create")
    private LocalDate dateCreate;

    @ManyToOne
    private Area area;

    @Embedded
    private Salary salary;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @ManyToOne
    private Employer employer;

    private int popularity;

    @Column(name = "views_count")
    private int viewsCount;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(LocalDate dateCreate) {
        this.dateCreate = dateCreate;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Salary getSalary() {
        return salary;
    }

    public void setSalary(Salary salary) {
        this.salary = salary;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    public int getPopularity() {
        return popularity;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }

    public int getViewsCount() {
        return viewsCount;
    }

    public void setViewsCount(int viewsCount) {
        this.viewsCount = viewsCount;
    }

    @Override
    public String toString() {
        return "Vacancy=" + id +
                ", name=" + name + '\n' +
                ", dateCreate=" + dateCreate + '\n' +
                ", salary=" + salary + '\n' +
                ", createdAt=" + createdAt + '\n' +
                ", employer=[id=" + employer.getId() + ", name=" + employer.getName() + "]\n" +
                ", area=" + area + '\n' +
                ", popularity=" + popularity + '\n' +
                ", viewsCount=" + viewsCount + '\n' +
                ']';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vacancy vacancy = (Vacancy) o;
        return Objects.equals(id, vacancy.id);
    }

    @Override
    public int hashCode() { return 27; }

}
