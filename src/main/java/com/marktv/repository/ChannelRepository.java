package com.marktv.repository;

import com.marktv.domain.Channel;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Channel entity.
 */
public interface ChannelRepository extends JpaRepository<Channel,Long> {

}
