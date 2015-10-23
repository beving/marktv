package com.marktv.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.marktv.domain.Channel;
import com.marktv.repository.ChannelRepository;
import com.marktv.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Channel.
 */
@RestController
@RequestMapping("/api")
public class ChannelResource {

    private final Logger log = LoggerFactory.getLogger(ChannelResource.class);

    @Inject
    private ChannelRepository channelRepository;

    /**
     * POST  /channels -> Create a new channel.
     */
    @RequestMapping(value = "/channels",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Channel> createChannel(@RequestBody Channel channel) throws URISyntaxException {
        log.debug("REST request to save Channel : {}", channel);
        if (channel.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new channel cannot already have an ID").body(null);
        }
        Channel result = channelRepository.save(channel);
        return ResponseEntity.created(new URI("/api/channels/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert("channel", result.getId().toString()))
                .body(result);
    }

    /**
     * PUT  /channels -> Updates an existing channel.
     */
    @RequestMapping(value = "/channels",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Channel> updateChannel(@RequestBody Channel channel) throws URISyntaxException {
        log.debug("REST request to update Channel : {}", channel);
        if (channel.getId() == null) {
            return createChannel(channel);
        }
        Channel result = channelRepository.save(channel);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert("channel", channel.getId().toString()))
                .body(result);
    }

    /**
     * GET  /channels -> get all the channels.
     */
    @RequestMapping(value = "/channels",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Channel> getAllChannels() {
        log.debug("REST request to get all Channels");
        return channelRepository.findAll();
    }

    /**
     * GET  /channels/:id -> get the "id" channel.
     */
    @RequestMapping(value = "/channels/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Channel> getChannel(@PathVariable Long id) {
        log.debug("REST request to get Channel : {}", id);
        return Optional.ofNullable(channelRepository.findOne(id))
            .map(channel -> new ResponseEntity<>(
                channel,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /channels/:id -> delete the "id" channel.
     */
    @RequestMapping(value = "/channels/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteChannel(@PathVariable Long id) {
        log.debug("REST request to delete Channel : {}", id);
        channelRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("channel", id.toString())).build();
    }
}
