package com.cameerons.taskIt.modals;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;
@Table(name = "documents")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String content;
    @Column(columnDefinition = "boolean default false")
    private Boolean isArchived;

    // icon is optional
    private String icon;

    // A document belongs to a user and a user has many documents
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "user_id", foreignKey = @ForeignKey(name = "document_user_fk"))
    private User user;


    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Document parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Document> children;


}
