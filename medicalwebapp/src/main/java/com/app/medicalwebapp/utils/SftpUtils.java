package com.app.medicalwebapp.utils;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
import org.springframework.stereotype.Service;

//@Service
public class SftpUtils {

    private String host = "127.0.0.1";
    private int port = 5000;
    private Session session = null;

    public SftpUtils() throws JSchException, SftpException {
        this.connect();
        this.upload("meme.png", "incoming/meme.png");
        this.disconnect();
    }

    public void connect() throws JSchException {
        JSch jsch = new JSch();

        // jsch.addIdentity();
        //session = jsch.getSession(server);

         session = jsch.getSession("medwebuser", host, port);
         session.setPassword("password");

        session.setConfig("StrictHostKeyChecking", "no");
        session.connect();
    }

    public void upload(String source, String destination) throws JSchException, SftpException {
        Channel channel = session.openChannel("sftp");
        channel.connect();
        ChannelSftp sftpChannel = (ChannelSftp) channel;
        sftpChannel.put(source, destination);
        sftpChannel.exit();
    }

    public void download(String source, String destination) throws JSchException, SftpException {
        Channel channel = session.openChannel("sftp");
        channel.connect();
        ChannelSftp sftpChannel = (ChannelSftp) channel;
        sftpChannel.get(source, destination);
        sftpChannel.exit();
    }

    public void disconnect() {
        if (session != null) {
            session.disconnect();
        }
    }
}
